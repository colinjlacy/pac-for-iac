# Policy-as-Code for Infrastructure-as-Code

This repo serves as a demo for a talk I gave at OpenTofu Day 2024 in Salt Lake City. It demonstrates how to leverage OPA and its Rego policy language to declare policies that govern OpenTofu configurations.

## To Run:

You'll need to have [OpenTofu](https://opentofu.org/docs/intro/install/), [Conftest](https://www.conftest.dev/install/), and [OPA](https://www.openpolicyagent.org/docs/latest/) installed first.

Once you do, you can pull this repo and set it up locally. You can do the following steps at any time, since they won't be impacted by switching branches.

The admin portal stack is set up in a Docker Compose file found in `/admin/docker-compose.yaml`. You can start that by running:
```sh
cd admin && docker-compose up
```

The state export script is found in `/state-export`, and is a NodeJS script that requires external dependencies. Install those with:
```sh
cd state-export && npm install
```

Now you can run through the demo, switching between the different branches (step1 - step4), or experimenting with the code how you see fit.

### Necessary Environment Variables

It's worth noting that the OpenTofu `providers.tf` file does have encryption set for the state and plan outputs. The provider setup also requires a GitHub token to be set that has access to a public org. 

You can set these with environment variables before running through the code, and they'll stay set as long as you're working in the same terminal session:
```sh
export TF_VAR_passphrase=thisthatthosethem
export GITHUB_TOKEN=<your-github-token>
```