#include <ESP8266WiFi.h>
#include <HX711_ADC.h>
#include <MQ135.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
#include <Adafruit_MQTT_FONA.h>

const int HX711_dout = 2; //mcu > HX711 dout pin
const int HX711_sck = 14; //mcu > HX711 sck pin

HX711_ADC LoadCell(HX711_dout, HX711_sck); //Constructor

const int calVal_eepromAdress = 0;
unsigned long t = 0;


/************************* WiFi Access Point *********************************/

#define WLAN_SSID       "Familia Resnik"
#define WLAN_PASS       "sanlorenzo"

/************************* Adafruit.io Setup *********************************/

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME    "SantiR"
#define AIO_KEY         "aio_YPHY89pviqnN5VscYugHsos3Kdd4"

/************ Global State (you don't need to change this!) ******************/

// Create an ESP8266 WiFiClient class to connect to the MQTT server.
WiFiClient client;
// or... use WiFiClientSecure for SSL
//WiFiClientSecure client;

// Setup the MQTT client class by passing in the WiFi client and MQTT server and login details.
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

/****************************** Feeds ***************************************/

// Setup a feed called 'photocell' for publishing.
// Notice MQTT paths for AIO follow the form: <username>/feeds/<feedname>
Adafruit_MQTT_Publish G_Weigh = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/g-weigh");
Adafruit_MQTT_Publish G_Air = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/g-air");
/*************************** Sketch Code ************************************/

// Bug workaround for Arduino 1.6.6, it seems to need a function declaration
// for some reason (only affects ESP8266, likely an arduino-builder bug).
void MQTT_connect();

void setup() {
  Serial.begin(115200);
  delay(10);

  Serial.println(F("Adafruit MQTT demo"));

  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  Serial.println("IP address: "); Serial.println(WiFi.localIP());


  LoadCell.begin();
  float calibrationValue = 696.0;
  unsigned long stabilizingtime = 2000;
  boolean _tare = true;
    LoadCell.start(stabilizingtime, _tare);
    LoadCell.setCalFactor(calibrationValue); // set calibration value (float)
    Serial.println("Startup is complete");
}

void loop() {
  
    // put your main code here, to run repeatedly:
MQ135 gasSensor = MQ135(A0);
float air_quality = gasSensor.getPPM() / 1000;
Serial.print(air_quality);
  if (! G_Air.publish(air_quality)) {
    Serial.println(F("Failed"));
  } else {
    Serial.println(F(" OK!"));
  }
 
  // Ensure the connection to the MQTT server is alive (this will make the first
  // connection and automatically reconnect when disconnected).  See the MQTT_connect
  // function definition further below.
static boolean newDataReady = 0;
  const int serialPrintInterval = 0; //increase value to slow down serial print activity

  // check for new data/start next conversion:
  if (LoadCell.update()) newDataReady = true;

  // get smoothed value from the dataset:
  float value = LoadCell.getData();

  // receive command from serial terminal, send 't' to initiate tare operation:
  if (Serial.available() > 0) {
    char inByte = Serial.read();
    if (inByte == 't') LoadCell.tareNoDelay();
  }
  MQTT_connect(); 

  // check if last tare operation is complete:
  if (LoadCell.getTareStatus() == true) {
    Serial.println("Tare complete");
  }
    // Now we can publish stuff!
  Serial.print(F("\nSending weigh val "));
  Serial.print(value);
  Serial.print("...");
  if (! G_Weigh.publish(value)) {
    Serial.println(F("Failed"));
  } else {
    Serial.println(F("OK!"));
  }
 delay(10000);

}

// Function to connect and reconnect as necessary to the MQTT server.
// Should be called in the loop function and it will take care if connecting.
void MQTT_connect() {
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);  // wait 5 seconds
       retries--;
       if (retries == 0) {
         // basically die and wait for WDT to reset me
         while (1);
       }
  }
  Serial.println("MQTT Connected!");
}
