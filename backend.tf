terraform {
  backend "gcs" {
    bucket = "continuus-terraformed"
    prefix = "terraform/state"
  }
}
