from confluent_kafka import Producer
import json

class RoomEventProducer:
    def __init__(self):
        self.producer = Producer({
            'bootstrap.servers': 'kafka:9092',
        })

    def publish_room_event(self, event_type, room_data):
        self.producer.produce(
            topic="room_events",
            value=json.dumps({
                "event_type": event_type,
                "data": room_data
            }).encode('utf-8')
        )
        self.producer.flush()

# Example: Send a room update event
if __name__ == "__main__":
    producer = RoomEventProducer()
    producer.publish_room_event(
        event_type="RoomUpdated",
        room_data={"room_id": 101, "status": "occupied"}
    )