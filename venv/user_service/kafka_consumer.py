from confluent_kafka import Consumer
import json
import threading

class UserEventConsumer:
    def __init__(self):
        self.consumer = Consumer({
            'bootstrap.servers': 'kafka:9092',
            'group.id': 'user-service-group',
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
                    print(f"UserService: Processing reservation for user {event['data']['user_id']}")
        except KeyboardInterrupt:
            pass
        finally:
            self.consumer.close()

def run_consumer():
    consumer = UserEventConsumer()
    consumer.start_consuming()

if __name__ == "__main__":
    threading.Thread(target=run_consumer, daemon=True).start()