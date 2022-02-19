# Kubernetes on the GCP

## !important

Deploying resources on the GCP costs money, if you're just testing stuff, be sure to delete resources afterwards. You can delete a cluster, for instance, by running `gcloud container clusters delete {cluster_name}`. Also, also the resources you create with the `gcloud` CLI are deletable in the GCP UI.

## prerequisites

- prerequisites from root `README.md`
- `gcloud` cli installed on your machine
- have a project on the GCP
- having enabled Kubernetes Engine and Artifact Registry API's for your project on the GCP

## necessary steps for using Kubernetes on the GCP

- check if you have the right authenticated user => `gcloud auth list --filter=status:ACTIVE --format="value(account)"`
- set project id if not done already => `gcloud config set project {project_id}`
- set compute zone for your project, for instance => `gcloud config set compute/zone europe-west3-a`
- set compute region for your project, for instance => `gcloud config set compute/region europe-west3`
- create a cluster like so => `gcloud container clusters create {cluster_name} --num-nodes=2` (or whatever number of nodes you want, it makes sense to have at least 2 in case one node dies)
- get your cluster's credentials => `gcloud container clusters get-credentials {cluster_name}` (this will set up `kubectl` to interact with your cluster)

The compute region and zone refer to where your Kubernetes clusters and resources will live.

## good to know

- GKE assigns DNS hostnames to static kube services IP's. For example, hello-app.default.svc.cluster.local.
