# Docker Excersise
This excersise will is about how to use Docker for creating, deploying and running applications inside containers.

## What is docker?
Docker is a development tool to make it easier to create, deploy and run applications on any linux machine no matter the configuration on that machine. Docker uses containers to wrap the application in an environment with all its dependancies and libraries and ships it all out as one package.

## What is the difference between:
* Virtual machine
    A virtual machine creates a whole virtual operating system for each instance and with it's own kernel.
* Docker container
    Docker container wraps only the application and its dependacies/libraries and many containers can use the host machines operating system and kernel which means that the container does not need it's own virtual operating system.
* Docker image
    A container is launched by running an image. The image is the executable package needed to run the application such as code, libraries, dependacies and configuration files.

## Web API
An API (Application programming interface) is a set of functions and procedures that allow the creation of applications which access the features or data of an operating system, application, or other service. Web API is the same set of functions and procedures but executable through HTTP protocols to access features or data from an application or service.

## Postgres
Postgres is an open-source object-relational database system. Postgres uses SQL query language combined with other features to safely store objects and oject mappings in a database.

## package.json file dependencies field:
Holds information about NPM modules(libs) that the application is using.

## NPM express package:
Express is minimal and flexible Node.js web app framework, that provide a robust set of features to develop web and mobile apps. 

## NPM pg package:
Non-blocking PostgresSQL client for Node.js.

## What is docker-compose:
Docker-compose is a tool for defining and running multiple container Docker applications.

## Results
Got to know docker, to create, deploy and run applications inside containers instead of VMs. 
To deploy images to docker cloud, to tag an images and publish them to the cloud. Define multiple services as containers with docker-compose inside configuration yaml file and building and running all services.
