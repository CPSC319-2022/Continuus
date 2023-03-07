terraform {
  backend "gcs" {
    bucket  = "artifacts.automatic-bot-376307.appspot.com"
    prefix  = "state"
  }  
  required_version = ">= 0.13"  
  required_providers { 
    google = {
      source = "hashicorp/google"
      version = "4.56.0"
    }
  }
}
provider "google" {
  project = "<gcp_project_id>"
  region  = "<regione_name>"
  zone    = "<zone_name>"
}

