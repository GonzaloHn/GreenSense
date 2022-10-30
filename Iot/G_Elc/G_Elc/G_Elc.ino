#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
#include <Adafruit_MQTT_FONA.h>
#include <ESP8266WiFi.h>


#define WLAN_SSID       "Familia Resnik"
#define WLAN_PASS       ""


#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME  "SantiR"
#define AIO_KEY       ""

WiFiClient client;

Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Publish G_Elc = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/G-Elc");

void MQTT_connect();

void setup() {
   Serial.begin(115200);
   analogReference(EXTERNAL);
  delay(10);
    Serial.println(F("Adafruit MQTT demo"));

  // put your setup code here, to run once:
  Serial.println(); Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
}
}
void loop() {
  
  MQTT_connect();
  int sensorValue = analogRead(A0); //Lectura analógica
  float voltajeSensor = analogRead(A0) * (1.1 / 1023.0); //voltaje del sensor
  float corriente=voltajeSensor*50.0; //corriente=VoltajeSensor*(50A/1V)
  Serial.println(corriente,3);//enviamos por el puerto serie
  
  if (! G_Elc.publish(corriente)) {
    Serial.println(F("Failed"));
  } else {
    Serial.println(F(" OK!"));
  }
 delay(2500);
}
void MQTT_connect() {
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 2;
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
