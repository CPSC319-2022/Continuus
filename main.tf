resource "google_cloudbuild_trigger" "build-trigger" {
  //Source section
  github {
    owner = "CPSC319-2022"
    name  = "Continuus"
    //Events section  
    pull_request
  }
  ignored_files = [".gitignore"]

  //Configuration section
  // build config file
  filename = "cloudbuild/feature-build.yaml"
}
