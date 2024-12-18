import 'dotenv/config'
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load GOOGLE_APPLICATION_CREDENTIALS from env variable which points to service account key 
const app = initializeApp({
  credential: applicationDefault()
});

const db = getFirestore(app);

async function getChargingPoints(db) {
  const chargingPoints = db.collection('chargingPoints');
  const chargingPointSnapshot = await chargingPoints.get();
  const chargingPointList = chargingPointSnapshot.docs.map(doc => doc.data());
  console.log(JSON.stringify(chargingPointList));
  return chargingPointList;
}

async function addChargingPoint(db, chargingPoint) {
  const chargingPoints = db.collection('chargingPoints');
  const chargingPointRef = await chargingPoints.add(chargingPoint);
  console.log('Added document with ID: ', chargingPointRef.id);
}

addChargingPoint(db, { 
  "cpId ": "CPU_1234", 
  "hostId": "HOST_1234", 
  "status": "active", 
  "location": { 
    "_latitude": 0,
     "_longitude": 0 
    }, 
  "pricePerWatt": 2,
   "defaultPrice": 1,
   "facilities": ["wifi",
     "coffeeMachine"],
   "rating": 1,
   "blockedUntil": { "_seconds": 1734028200,
     "_nanoseconds": 103000000 
    } 
  })

getChargingPoints(db)