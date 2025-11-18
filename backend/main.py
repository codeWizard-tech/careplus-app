from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# --- Enable CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------------

motivations = [
    "You are doing great! Keep going!",
    "Believe in yourself — you’re stronger than you think.",
    "Small progress is still progress.",
    "Stay consistent and trust the process."
]

reminders = [
    "Drink water and stay hydrated.",
    "Take a 2-minute stretch break.",
    "Adjust your posture.",
    "Close your eyes and relax for 10 seconds."
]

@app.get("/notifications")
def get_motivation():
    return {"message": random.choice(motivations)}

@app.get("/reminders")
def get_reminder():
    return {"message": random.choice(reminders)}
