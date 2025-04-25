from confluent_kafka import Producer
import json

class BookingEventProducer:
    def __init__(self):
        self.producer = Producer({
            'bootstrap.servers': 'kafka:9092',
        })

    def publish_booking_event(self, event_type, booking_data):
        self.producer.produce(
            topic="reservation_events",
            value=json.dumps({
                "event_type": event_type,
                "data": booking_data
            }).encode('utf-8')
        )
        self.producer.flush()

# Example: Send a reservation event
if __name__ == "__main__":
    producer = BookingEventProducer()
    producer.publish_booking_event(
        event_type="ReservationCreated",
        booking_data={
            "reservation_id": 1,
            "user_id": 1,
            "room_id": 101,
            "time_slot": "2025-04-25T14:00:00"
        }
    )