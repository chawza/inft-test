# Referall DB API
This repository is for techincal test for INFT.

The tasks are
1. to make a node API service.
2. make a *sort-it-all-out* test.

The *sort-it-all-out* test is in `main.py` file which can be execute immedietly using `python3` interpreter (does not need any external library required).

## Overview
This project is a service for doing CRUD of referral data. It does not have authentication or any safe guard.
The server uses `expressjs` to accepta API requests and return response. The database that being used is `sqlite` because it is a simple application.

## Before `dev`
Before `npm run dev` the program, please create the table first on the database. The default path of the db is `./db/data.db`. Then create the **referral** table which can be found in `/db/queries.sql`.

> you can manually add table using sqlite's cli from the [official web](https://sqlite.org/download.html)


Then install all dependencies
```
npm install
```

Then run the server
```
npm run dev
```

## Features
There are 4 routes that can be called, which each has their own function:
1.  /POST `/api/referral`: To post a new referral. Referral's properties are stored request body
2.  /GET `/api/referral/:id`: To fetch one referral by `id`
3.  /PUT `/api/referral/:id`: Update referral properties by its `id`
4.  /GET `/api/referral/all`: fetch all referral with pagination option using url queries 
       -  `currentPage` is the page index
       -  `paginationNumber` number of referrals per page (optional).