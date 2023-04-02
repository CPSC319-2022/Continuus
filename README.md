# Local Installation Guide

## Google OAuth Setup

- Follow the instructions in **[Setting Up OAuth 2.0](https://support.google.com/cloud/answer/6158849)**
  1. For the "Application Type", choose "Web application"
  2. Add a URI to "Authorized JavaScript origins":
     - `http://localhost`
  3. Add a URI to "Authorized redirect URIs":
     - `http://localhost:3000/api/auth/callback/google`
  4. **Save the Client ID and the Client secret somewhere safe, we will use these during the blog application setup**

## Blog Application Setup

### 1. Clone the repo

- Clone the repository using:

```
git clone git@github.com:CPSC319-2022/Continuus.git
```

### 2. Install Node/npm

1. Go to: https://nodejs.org/en/

2. Download the LTS version

3. Follow the setup instructions

4. Run `npm --version`
   - If you don’t get the version number (the error message is something like “what’s npm?”), then try restarting your terminals, try checking the PATH environment variable and try restarting your system

### 3. Install dependencies

- You can install dependencies using (run in the project root folder):

```
npm install
```

### 4. Setting up the environment

1. Copy-paste the .env.example and rename to .env
2. Set the variables in the .env to appropriate values
   - DATABASE_URL: Use the default value, if needed you can update this depending on your Postgres setup (next section)
   - NEXTAUTH_URL: If you are developing locally, leave this as default
   - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET: Set these to the client id and client secret you have saved from the Google OAuth Setup section

### 5. Setting up Prisma

1. Install Postgres Database locally

   1. IMPORTANT: Set your username to postgres and password to password for .env-example to work. Follow [How to Run and Setup a Local PostgreSQL Database | Prisma](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)
   2. Open the psql terminal
   3. Run the command `CREATE DATABASE continuus;`

2. Run

```
npx prisma migrate dev
```

- This will update the database using the schema
- And also generate the Prisma Client

### 6. Run

Use `npm run dev` to start a dev server running in your local

# Deployment Guide

## GitHub Setup

- You have 2 options, choose **only one** of these options; forking the repo, or creating a new repo
  - Forking a repo is easier
  - You may want to create a new repo; if you have changes in your local, it's easier to create a new repo

### Forking the repo

1. Go to `https://github.com/CPSC319-2022/Continuus`
2. Click on the "Fork" button
3. Enter the repository name as you wish
4. **Deselect** the "Copy the `dev` branch only" option
5. Press "Create fork" button
6. The repo you created will have the 'dev', 'qa' and 'prod' branches by default.

### Creating a new repo

1. If you have not cloned the repository previously
   - Clone the repository using:
     ```
     git clone git@github.com:CPSC319-2022/Continuus.git
     ```
1. [Create a new repository in GitHub](https://github.com/new)
   1. **Deselect** 'Add a README file' option
   2. Do **NOT** add .gitignore
   3. Do **NOT** add a licence
1. Set the remote origin url using:

```
git remote set-url origin [github ssh address]
```

1. Then set the main branch as dev and push

```
git branch -M dev
git push -u origin dev
```

1. The repo will **NOT** have the 'qa' and 'prod' branches by default, so feel free to create them now or later.

## Cloud Database Setup

### Creating a Postgres DB Instance on Google Cloud

1. Follow instructions [**here**](https://cloud.google.com/sql/docs/postgres/create-instance#create-2nd-gen) to create a Postgres instance on Google Cloud
   - Store the password for the postgres user somewhere safe
   - Don't need to "configure a password policy for the instance"
   - Database version should be `PostgeSQL 14`
   - Make sure to note down the region you selected, you will need it during the CI-CD Setup
   - You do **not** need to customize your instance (choose the free/default option)
2. Follow instructions [**here**](https://cloud.google.com/sql/docs/postgres/create-manage-databases#create) to create a database
   - Create 3 databases:
     - `dev`
     - `prod`
     - `qa`

## CI-CD Setup

- The repository comes with configuration files for Github Actions and Google Cloud Platform. Github Actions coordinates build, test and deployment triggers for Google Cloud Build, while Google Cloud Build builds the containers and deploys the product.
- The Github Actions configuration files are found in .github/workflows/. The status for the stages defined in these yml files are shown in the Github Actions pipeline view
  - The `dev-qa-prod.yml` coordinates building, testing and deployment with Google Cloud Build. It will run the pipeline for all commits to these branches
  - The `feature-workflow.yml` coordinates building and testing with Google Cloud Build. It will run the pipeline for opened pull requests to `dev`, `qa` and `prod`
- The Google Cloud Build configuration files are found in cloudbuild/.
  - For the Google Cloud triggers to work correctly, Google Cloud Build must be set up for the Github repository.
  - Ensure that the Github repository is connected to Google Cloud Build. Follow the instructions in **[Connect to a Github repository]**(https://cloud.google.com/build/docs/automating-builds/github/connect-repo-github?generation=1st-gen) to connect it.
  - Add a trigger for each yaml in the cloudbuild. Set up each trigger to run on the event of "Manual invocation" on branch name "\*" and configured with a Cloud Build configuration file pointing to be one of the yamls in the cloudbuild folder

## Google OAuth Setup (for cloud)

- Follow the instructions in **[Setting Up OAuth 2.0](https://support.google.com/cloud/answer/6158849)**
  1. We will create 3 credentials, one for each environment
  2. Repeat steps 3-6 for each environment ('dev', 'qa', 'prod')
  3. For the "Application Type", choose "Web application"
  4. Add a URI to "Authorized JavaScript origins" (you can take the deployed URI from the CI-CD pipeline's deploy stage):
     - deployed URI
     - e.g.
       - `https://dev-hmcu4gyu5a-pd.a.run.app`
       - OR
       - `https://qa-hmcu4gyu5a-pd.a.run.app`
       - OR
       - `https://prod-hmcu4gyu5a-pd.a.run.app`
  5. Add a URI to "Authorized redirect URIs":
     - `${deployed URI}/api/auth/callback/google`
     - e.g.
       - `https://dev-hmcu4gyu5a-pd.a.run.app/api/auth/callback/google`
       - OR
       - `https://qa-hmcu4gyu5a-pd.a.run.app/api/auth/callback/google`
       - OR
       - `https://prod-hmcu4gyu5a-pd.a.run.app/api/auth/callback/google`
  6. **Save the Client ID and the Client secret somewhere safe _for each environment_, we will use these during the secret manager setup**

## Google Cloud Platform Setup

### IAM
A service account will be needed to perform specific actions in GCP services. For the services we are using (Cloud Build, Cloud Run, Artifact Registry, Cloud SQL, and Cloud Logging), a service account will need to be created with the following roles:
  - Artifact Registry Administrator
  - Artifact Registry Service Agent
  - Artifact Registry Test
  - Artifact Registry Writer
  - Cloud Build Editor
  - Cloud Run Admin
  - Cloud Run Service Agent
  - Cloud Run Service Role
  - Cloud SQL Client
  - Editor
  - Logs View Accessor
  - Logs Writer
  - Secrets Manager Secret Accessor
  - Storage Object Viewer

### Cloud Build
Cloud Build is a GCP service that lets us perform specific build actions for different stages in our pipeline. See [CI-CD Setup](#ci-cd-setup) for the workflows we are using. We have connected Cloud Build and our GitHub repository using the [Google Cloud Build GitHub Marketplace App](https://github.com/marketplace/google-cloud-build). 

A Cloud Build Trigger lets us define a sequence of instructions that can be run to help us perform all the actions required to build, test, and deploy our application to Cloud Run. A trigger will need to be created for each step in the pipeline (see [here](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers) for how to create a trigger). We created 4 triggers: 
- `build`
  - Creates 2 Docker containers: one for deployment and one for testing
  - Testing container
    - Runs `npm install` to install all dependencies (required for running unit tests)
    - Pushes container to Artifact Registry
  - Deployment container
    - Builds our application from the source code (runs `npm run build`)
    - Pushes the build container to Artifact Registry
    - *Note: this trigger will fail if an error occurs in `npm run build` (eg. linting errors)*
- `feature-build`
  - Same as the `build` trigger except does not create/push a container to Artifact Registry for deployment because builds in this stage will not be deployed to an environment
- `test`
  - Pulls the Test container created in the `build` stage of the pipeline
  - Runs unit tests with `npm run test`
  - *Note: this trigger will fail if any unit tests are not passing*
- `deploy`
  - Pulls the Deployment container created in the `build` stage of the pipeline
  - Deploys application to Cloud Run

### Cloud Run
Cloud Run is the runtime environment we are using for our application deployments. There is very little configuration needed for this part of the pipeline as Cloud Build is capable of creating and deploying the applications directly from a build trigger. We are currently deploying applications to 3 environments: `dev`, `qa`, and `prod`. Our GitHub branch names are used to generate the URLs to which the applications will be deployed. Here are the list of active deployments we have in Cloud Run:

- https://dev-hmcu4gyu5a-pd.a.run.app/
- https://qa-hmcu4gyu5a-pd.a.run.app/
- https://prod-hmcu4gyu5a-pd.a.run.app/


## GitHub Actions Setup
GitHub actions is what we are using as our Web UI to display information about the current status of builds. Actions lets us declare a sequence of jobs in a `.yml` file that allow us to kick off the triggers in our Cloud Build pipeline. 

### Requirements:
- Google Cloud Platform account
- GCP Cloud Build triggers set up for each build step
- [`wait-for-build`](#wait-for-build) script present in the `/scripts` directory

### Secrets
In order to get GitHub Actions working, a few repository secrets need to be specified. An account with proper authorization in the [Continuus repository](https://github.com/CPSC319-2022/Continuus/settings/secrets/actions) is required to complete this step. 

Navigate to the [Actions secrets and variables](https://github.com/CPSC319-2022/Continuus/settings/secrets/actions) page in the repository and enter the following **repository secrets**:

- `GCP_BUILD_BUILD_ID`
  - Description: Google Cloud Build trigger ID for the `build` stage of the pipeline
  - Where to find: GCP Console > Cloud Build > Triggers > `build` trigger 
  - Parameter: uuid in the URL of the trigger
- `GCP_BUILD_DEPLOY_ID`
  - Same as above for `build` trigger
- `GCP_FEATURE_BUILD_ID`
  - Same as above for `feature-build` trigger
- `GCP_BUILD_TEST_ID`
  - Same as above for `test` trigger
- `GCP_CREDENTIALS`
  - Description: GCP credentials file in JSON format for a service account with sufficient permissions (see [IAM](#iam))
  - Where to find: https://developers.google.com/workspace/guides/create-credentials#create_credentials_for_a_service_account

### workflows.yml files
A workflow.yml file lets us define the jobs for our GH Actions. Additional workflows can be added to the `.github/workflows` folder in the repository and triggered on any GitHub action (eg. on pull request, push, etc)

The Continuus repository currently has 2 workflows:
- `dev-qa-prod.yml`
  - Initiates `build`, `test`, and `deploy` triggers in Cloud Build (in that order)
- `feature-workflow.yml`
  - Initiates `feature-build` and `test` triggers in Cloud Build

### `wait-for-build`
The [`wait-for-build`](./scripts/wait-for-build) monitors the status of a Cloud Build trigger and **blocks** the GitHub Actions pipeline from progressing if the current trigger has not yet completed. The script polls for the status of the GCP Cloud Build trigger every 10 seconds. If the trigger is in progress, it will continue to poll. 

If the build failed, an `exit 1` will be sent to the GitHub Actions runner and the pipeline will fail. If the build times out (takes more than 15 minutes), the build will fail with an `exit 1` as well. 

This script will also print out logs of a failed build, and also provides a link to the GCP log for the Cloud Build trigger. An example of the output of the `wait-for-build` script can be found [here](https://github.com/CPSC319-2022/Continuus/actions/runs/4590165175/jobs/8105619362).  

Each job in the workflow must call this script if it is using a trigger from Cloud Build. The script takes in 2 parameters: the Cloud Build trigger ID and the branch name of the current branch. An example of a call to `wait-for-build` in a GitHub Actions workflow file can be found [here](https://github.com/CPSC319-2022/Continuus/blob/dev/.github/workflows/dev-qa-prod.yml#L29-L33).  

TODOS:

[CI-CD Setup] setup steps for secret manager (for this step, please let me know (Altay) so that I can add steps here)

## Setup steps for slack integration

### Prereqisites

1. Google cloud project is setup.
2. Billing is enabled.

### Steps

1. Enable the Cloud Functions and Pub/Sub APIs
   - You can enable using [this link](https://console.cloud.google.com/flows/enableapi?apiid=cloudfunctions,pubsub).
2. Setup Incoming Webhook for Slack
   - Follow the steps [here](https://api.slack.com/messaging/webhooks). The webhook url will be useful in later steps.
3. Create a Cloud Storage Bucket for staging the cloud function.
   - Using the cloud shell terminal in the Google cloud console. Ensure that the terminal session is for the correct gcp project. (You should see the project id in the terminal).
   - Tip for choosing a bucket name is to use `[PROJECT-ID]_cloudbuild`
   - Run `gsutil mb gs://[BUCKET_NAME]`
4. In the cloud shell terminal,
   - create a directory called slackbot and run `cd slackbot`.
   - create a two files app.js and package.json with the command `touch app.js package.json`.
   - Using vim or any equivalent text editor, copy and paste the respective contents of the files from [this gist](https://gist.github.com/algo-1/0c490cd7ea018205fced4da07d496537) and follow the following steps;
     - Run `npm install` to install the dependencies.
     - On line 4 of app.js, change the `SLACK_WEBHOOK_URL` to the url of your webhook created in step 2.
     - On line 61 change the `repoName` to the name of your repository.
     - Finally, on line 105, modify the url to match that of your repository
5. Deploy the Cloud Function
   - Run the command below from the `slackbot/` directory, passing in the name of the bucket created in step 3 for `[BUCKET_NAME]`;
   ```bash
   gcloud functions deploy subscribe --stage-bucket [BUCKET_NAME] --runtime=nodejs18 --trigger-topic cloud-builds
   ```

[CI-CD Setup] setup steps for cloud build
