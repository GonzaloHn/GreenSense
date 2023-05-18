#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
//#include <Adafruit_MQTT_FONA.h>
#include <ESP8266WiFi.h>


#define WLAN_SSID       "Familia Resnik"
#define WLAN_PASS       "sanlorenzo"


#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME  "SantiR"
#define AIO_KEY       ""



#include <TrueRMS.h>
#define loopPeriod 1000
#define adcPin A0  
#define rmsWindow 50       // rms window of 50 samples, 3 periods @60Hz
#define sensorGain 1       // amount of gain on current transformer's op amp
#define ampsPerVolt 5      // current transformer output: 1 volt per 5 amps rms
#define adcMaxVoltage 3.3  // adc max input voltage is 3.3v on WeMos D1 Mini 
#define adcResolution adcMaxVoltage/1024  // each bit represents 3.3v/1024 for 10 bit adc

float voltRange = 3.3;
Rms readRms; 

WiFiClient client;

Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Publish G_Elc = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/g-elc");

void MQTT_connect();

void setup() {
   Serial.begin(112500);
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
 readRms.begin(voltRange, rmsWindow, ADC_10BIT, BLR_ON, CNT_SCAN);
  readRms.start();                  // start measuring
}
void loop() {
  
  MQTT_connect();

  int adcVal = analogRead(adcPin);
  readRms.update(adcVal); 

    readRms.publish();
    float rmsVal = readRms.rmsVal;                           // calculated rms value of adc voltage readings
    float currentRms = (rmsVal / sensorGain) * ampsPerVolt;  // actual current (amps) in current transformer
    Serial.print(rmsVal / sensorGain * 1000, 2);             // show raw rms voltage (mV) on adc
    Serial.print("mV ");
    Serial.print(currentRms * 1000, 2);                      // show actual current (mA) with 2 decimal places
    Serial.println("mA");
      
   if (! G_Elc.publish(currentRms * 1000, 2)) {
    Serial.println(F("Failed"));
    delay(100);
  } else {
    Serial.println(F(" OK!"));
    delay(100);
  }


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
