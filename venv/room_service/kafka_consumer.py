from confluent_kafka import Consumer
import json

class RoomEventConsumer:
    def __init__(self):
        self.consumer = Consumer({
            'bootstrap.servers': 'kafka:9092',
            'group.id': 'room-service-group',
            'auto.offset.reset': 'earliest',
        })
        self.consumer.subscribe(["reservation_events"])

    def start_consuming(self):
        try:
            while True:
                msg = self.consumer.poll(1.0)
                if msg is None:
                    continue
                event = json.loads(msg.value().decode('utf-8'))
                if event['event_type'] == 'ReservationCreated':
                    print(f"RoomService: Updating room {event['data']['room_id']} status")
        finally:
            self.consumer.close()

if __name__ == "__main__":
    RoomEventConsumer().start_consuming()