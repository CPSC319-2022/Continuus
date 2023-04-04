terraform {
  backend "gcs" {
    bucket = "artifacts.automatic-bot-376307.appspot.com"
    prefix = "state"
  }
  required_version = ">= 0.13"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.56.0"
    }
  }
}

provider "google" {
  project = "automatic-bot-376307"
  region  = "northamerica-northeast2"
  zone    = "northamerica-northeast2-a"
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name          = "${random_id.bucket_prefix.hex}-bucket-tfstate"
  force_destroy = false
  location      = "NORTHAMERICA-NORTHEAST2"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}
