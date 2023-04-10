resource "google_cloudbuild_trigger" "build-trigger" {
  //Source section
  github {
    owner = "CPSC319-2022"
    name  = "Continuus"
    //Events section  
    push {
      branch = "dev|qa|prod|demo|arun_terraform_demo"
    }
  }
  ignored_files = [".gitignore"]

  //Configuration section
  // build config file
  filename = "cloudbuild/build-and-deploy.yaml"
}
