from confluent_kafka import Producer
import json

class UserEventProducer:
    def __init__(self):
        self.producer = Producer({
            'bootstrap.servers': 'kafka:9092',  # Use 'kafka' instead of 'localhost' in Docker
        })

    def publish_user_event(self, event_type, user_data):
        self.producer.produce(
            topic="user_events",
            value=json.dumps({
                "event_type": event_type,
                "data": user_data
            }).encode('utf-8')
        )
        self.producer.flush()

# Example: Send a user registration event
if __name__ == "__main__":
    producer = UserEventProducer()
    producer.publish_user_event(
        event_type="UserRegistered",
        user_data={"user_id": 1, "email": "test@example.com"}
    )