# Developer Workflow and CI/CD Guide

This guide will walk you through the developer workflow and CI/CD systems for contributing to the Continuus repository. This is meant to provide an overview of how to create a PR, view builds in GitHub Actions, and how to get your code merged into the repository. Please see here for detailed installation guide to help you get set up. 

## Prerequisites
- A valid GitHub account
- Continuus repository cloned on your machine
- Basic knowledge of `git` and GitHub

## Contributing to the codebase
In order to contribute to the Continuus repository, you must have a GitHub account with admin access to the [CPSC319/2022](https://github.com/CPSC319-2022) organization. For assistance with getting a GitHub account setup, please reach out to a member of the [CPSC 319 course staff](https://www.students.cs.ubc.ca/~cs-319/index.html#contact-information).

### Creating a PR

To create a PR, first clone the repository to your machine. This can be done by copying the command from the `Code` dropdown on the main page of the repository. Make sure you are cloning the `dev` branch as this is the branch we are using for our deployment. 

To make a change, please create a new branch locally by using the command `git checkout -b <branch_name>`. There is no standard naming convention for branches but please give a descriptive name for your branch as it helps the maintainers clean up unused branches in the future.

Once you've created a branch and made a change to the code, commit your change and push it to GitHub using `git push`. You may see an error that looks like the one below. Copying and pasting the `git push --set-upstream ...` command to your terminal should resolve the issue. 
```
❯ git push
fatal: The current branch ci-cd-guide has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin ci-cd-guide
```

Once your branch has been uploaded to GitHub, you should see something like the following: 
![Screenshot_230417_171549](https://user-images.githubusercontent.com/46171819/232640746-dda882d9-5e9c-472f-85d1-9a20dd929ebb.png)

Click on the `Compare & pull request` button, and you will be brought to the Pull Request UI in GitHub. It should look something like the screenshot below. Our team has set up a PR template which **must be filled out** in order for your PR to be approved. Once everything looks good, click the `Create pull request` button and the tests will kick off. 
![Screenshot_230417_171608](https://user-images.githubusercontent.com/46171819/232640757-636eee64-4759-44bf-a828-424668a48297.png)

You will see some checks will start to initiate at the bottom of the screen when you create the PR. Please wait until all checks are finished before sending the PR for review. While the build is in flight, you can check the status of the build's entire pipeline progress (see CI/CD section below).
![Screenshot_230417_171906](https://user-images.githubusercontent.com/46171819/232640892-a5a3e74c-3b30-447b-a4f7-3ff95df4f794.png)

Once all checks are complete, you will see something like this: 
![Screenshot_230417_173240](https://user-images.githubusercontent.com/46171819/232640911-278c20c2-c05f-4e37-93b2-97e6b0bc5a0b.png)

### Getting your PR merged
Once your PR is ready to be merged, please use the `Reviewers` tab on the right-hand side of the PR to request a review. Note that you must receive at least one approval to be able to merge your PR into the development branch. The maintainers of this repository have notifications enabled for new PRs so we will be notified if you open a PR. If your build is passing and your PR description looks good, one of us will happily approve your PR (Note for TAs: you can approve each other's PRs for testing as long as the approver has admin access in the CPSC319 organization).

Once your PR is merged into the development branch, you will be able to check the status of the build in the Actions tab as mentioned earlier. The `dev`/`prod`/`qa` branches have additional workflow steps that will deploy the application to one of our Cloud Run environments, so once the build has finished you should see your change live! 

## CI/CD Pipeline
The status of a pipeline that is running in the build can be viewed in the [Actions tab](https://github.com/CPSC319-2022/Continuus/actions) in the repository. This is a handy feature that is built into GitHub Actions that lets the developer analyze the status of a build pipeline. 
![Screenshot_230417_172657](https://user-images.githubusercontent.com/46171819/232640934-257ab0db-1a18-4d30-8361-d157f3585649.png)

### Checking the status of a build pipeline
Clicking on a build will take you to the pipeline screen where you can see the status of the build. Each job in a GitHub Actions workflow also automatically creates a [Check](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) in the PR it is associated with that will not let the developer merge the change until all checks are passing. 

An example of a passing in progress
![Screenshot_230417_172531](https://user-images.githubusercontent.com/46171819/232640956-2c2e64f0-545c-4e9a-9ce2-5276bccb62f6.png)

An example of a passing build
![Screenshot_230417_173435](https://user-images.githubusercontent.com/46171819/232640976-4a19584f-a640-4fa2-8632-e85e5cdaf978.png)

An example of a failing build
![Screenshot_230417_172752](https://user-images.githubusercontent.com/46171819/232640986-5225456d-1fc9-4848-b63c-931672b45d71.png)

If a build fails, you can click on one of the failing test stages to view the logs. In this particular case, the Test stage failed because this PR did not meet the 80% threshold for unit test coverage. There are a number of reasons why your build might have failed, and it's always good to check the logs in GCP if this is happens. 
![Screenshot_230417_172822](https://user-images.githubusercontent.com/46171819/232640992-3e952bf5-bf61-4757-b07c-01bdabbab216.png)

### GCP Cloud Build Logs
You'll also notice that the failing build logs in GitHub actions provided a link to the build logs for this particular GCP Cloud Build trigger. If you need to dig deeper into why your build is failing please follow the link it provided. If you do not have access to our GCP console, please create an issue in our repository with the prefix `[REQUESTING GCP ACCESS]` and one of the maintainers will reach out. 

## Adapting our CI/CD system for your own project
Our GitHub Actions and GCP workflows can be easily adapted for your own repository. See [here](https://github.com/CPSC319-2022/Continuus#ci-cd-setup) for detailed setup instructions for how to configure your GitHub Actions and GCP configuration files to suit your needs. Note that this pertains only to setting up GitHub Actions and the various GCP services used for deployment. 

Note: We have not provided specific developer workflow configurations we have made in this repository such as branch rules and enforcing PR approvals as those are team dependent and highly subjective. 
