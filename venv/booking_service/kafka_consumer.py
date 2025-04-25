from confluent_kafka import Consumer
import json

class BookingEventConsumer:
    def __init__(self):
        self.consumer = Consumer({
            'bootstrap.servers': 'kafka:9092',
            'group.id': 'booking-service-group',
            'auto.offset.reset': 'earliest',
        })
        self.consumer.subscribe(["user_events", "room_events"])

    def start_consuming(self):
        try:
            while True:
                msg = self.consumer.poll(1.0)
                if msg is None:
                    continue
                event = json.loads(msg.value().decode('utf-8'))
                if event['event_type'] == 'UserRegistered':
                    print(f"BookingService: New user {event['data']['user_id']} registered")
                elif event['event_type'] == 'RoomUpdated':
                    print(f"BookingService: Room {event['data']['room_id']} status changed")
        finally:
            self.consumer.close()

if __name__ == "__main__":
    BookingEventConsumer().start_consuming()