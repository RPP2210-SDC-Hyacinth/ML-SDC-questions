## Questions and Answers Microservice System Design for Atelier

## Overview

This project replaced the legacy API for an e-commerce website with a more efficient backend system.

### Description

This backend system architecture for a preexisting e-commerce web-portal focused on supporting the full dataset for the existing front-end architecture and performing at a rate of at least 1,000 client requests per second under a 1% error rate in production.

This project included completing an ETL process for the client-provided dataset, building efficint API routes to communicate with a PostgreSQL database, and implementing data-driven performance optimizations including NGINX load balancing and Redis caching.

In a production environment consisting of 5 AWS EC2 t2.micro instances (1 PostgreSQL database, 1 NGINX load balancer, 3 Node.js servers), this backend service exceeds the bare minimum client expectations, as it is able to handle over 4,500 rps with <1% error rate in production.

### Installation

Information available upon request.

### Usage

This project provides the backend system architecture for the questions and answers portion of a preexisting ecommerce website.

### Contributor

Midori Li
