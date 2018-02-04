# Swarmer Docker Swarm Sample
This project is a sample project for showing some basics of using docker, docker compose and docker swarm.

## Set Up & Prerequisites

For this sample you'll need Docker and NodeJS installed. Some familarity with JavaScript and Express applications is helpful but not required

1. [Install Docker](https://docs.docker.com/install/)
1. [Install NodeJS](https://nodejs.org/en/download/)

## Database Set Up

This application during development can use a local mongodb and redis db if desired. To do so then you'll need to edit the config/default.yml file to point to your local installs and probably update the port.

Otherwise we have provided a local docker compose file which will run mongodb and redis in Docker Containers for you locally. If this is your first experience with Docker then this is a great way to see one of the benefits of using Docker during development.

*Please Note: We're running our databases on alternative ports in order to not conflict with any existing installs.*

To start up the databases during development run

``docker-compose -f docker-compose.db.yml up``

If you want to keep these databases up during the development pass the '-d' flag to run in detached mode which will keep these running in the background.

``docker-compose -f docker-compose.db.yml up -d``

To stop these running instances run:

``docker-compose -f docker-compose.db.yml down``


## Install

To install the necessary packages using yarn (we wrote this tutorial using yarn for so its best to use that)

``yarn install``

## Running

1. Make sure your databases are running with ``docker-compose -f docker-compose.db.yml up -d``
1. Run ``yarn start``

## First run with Docker

When first using Docker we want to run it as a standalone image and container. In this case its easier to do without any database dependencies. So we're going to first try this without any databases.

1. Checkout 'firstrun' branch.

``git fetch``

``git checkout firstrun``

2. Build your docker image

``docker build . -t swarmer``

A note about this. We are building a docker "Image" you can see all your built docker images by running ``docker images``. The name here of 'swarmer' can be anything. Most of the time you'll namespace these with your docker hub account name for example mikelight/swarmer (personal account) or powercompany/swarmer (organization account). This build step does not run anything, it just builds an image that can be run.


3. Run your docker image

``docker run -p 4000:3000 -d swarmer``

This runs your image in a container it will expose port 3000 of the app on port 4000 locally so you should be able to view the app at [http://localhost:4000](http://localhost:4000)

## Second Run With Docker Compose

With this sample we're using two databases which our application needs to communicate. Communication from within a container to services running on the local machine can be difficult.
