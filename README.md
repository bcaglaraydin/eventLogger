# eventLogger

- Collecting event logs and storing them in Google BigQuery 
- Analytics results related to events can be queried from Google BigQuery
     - Total user count
     - Daily active user count
     - Daily new users
     - Daily average session duration in seconds
- Google Cloud data pipeline services are used (PubSub / Dataflow)
- nginx used as a load balancer to distribute traffic (Round Robin)
- Can handle thousands of requests per second

``` / node / Google Cloud PubSub / Google Cloud BigQuery / Google Cloud Datalow / Google Cloud Storage / Docker / nginx / ```

## Local setup

1. Clone the repo into your local
   ```
   git clone https://github.com/bcaglaraydin/eventLogger/
   ```
2. Create a new project on Google Cloud --> https://cloud.google.com/resource-manager/docs/creating-managing-projects

3. Enable required API's on the project

3. Create a service account with required permissions on PubSub, BigQuery, Storage and Dataflow. Create and download a JSON key for the service account, rename it as ```key.json``` and place it in ```./node``` --> https://cloud.google.com/iam/docs/service-accounts

4. Create an ```.env``` file and place it in ```./node``` </br>
 Sample ```.env``` file:
    ```
    PROJECT_ID="<your-project-id>"
    BUCKET_NAME="eventlogbucket"
    TOPIC_NAME="eventlogtopic"
    SCHEMA_NAME="eventlogschema"
    DATASET_NAME="eventlogdataset"
    TABLE_NAME="eventlogtable"
    JOB_NAME="eventlogjob"
    ```
2. Make sure you have docker-compose and docker installed on your machine

3. Run the following command (N is the number of servers)
   ```
   docker-compose up --scale api=N
   ```
## Endpoints

### Store Event Log

#### Request

`POST http://localhost:3000/event/`

#### Sample Request Body

   ```
{
    "type": "event",
    "session_id":"9FDA74C2-AB57-4840-87D0-64324772B5A2",
    "event_name": "click"
    "event_time": 1589623711,
    "page": "main",
    "country": "TR",
    "region": "Marmara",
    "city": "Istanbul",
    "user_id": "Uu1qJzlfrxYxOS5z1kfAbmSA5pF2"
}
```

### Get Analytics

#### Request

`GET http://localhost:3000/event/`

#### Sample Response Body

   ```
{
    "total_users": 1000,
    "daily_stats": [
        {
            "date": "12/01/2021",
            "average_session_duration_min": 45,
            "active_user_count": 100,
            "new_user_count": 45
        },
        {
            "date": "13/01/2021",
            "average_session_duration_min": 40,
            "active_user_count": 92,
            "new_user_count": 30
        },
        {
            "date": "14/01/2021",
            "average_session_duration_min": 64,
            "active_user_count": 78,
            "new_user_count": 40
        }
    ]
}
```
## Contact

Berdan Çağlar Aydın - https://www.linkedin.com/in/bcaglaraydin/ - berdancaglaraydin@gmail.com
