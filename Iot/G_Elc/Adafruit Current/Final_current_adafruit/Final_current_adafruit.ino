#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
//#include <Adafruit_MQTT_FONA.h>
#include <ESP8266WiFi.h>


#define WLAN_SSID       "IoT"
#define WLAN_PASS       "elultimo10"


#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME  "soficasares"
#define AIO_KEY       "aio_TTYi41HkgrtgrIWeC2ln1z830ybE"

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
float Irms=get_corriente(); //Corriente eficaz (A)
  float Irmsf=Irms-0.830;
  float P=(Irms*220.0)-0.830; // P=IV (Watts)

  Serial.print("Irms: ");
  Serial.print(Irmsf,3);
  Serial.print("A, Potencia: ");
  Serial.print(P,3);  
  Serial.println("W");
  
  if (! G_Elc.publish(Irmsf,3)) {
    Serial.println(F("Failed"));
  } else {
    Serial.println(F(" OK!"));
  }
 delay(2500);
}
float get_corriente()
{
  float voltajeSensor;
  float corriente=0;
  float Sumatoria=0;
  long tiempo=millis();
  int N=0;
  while(millis()-tiempo<500)//Duración 0.5 segundos(Aprox. 30 ciclos de 60Hz)
  { 
    voltajeSensor = analogRead(A0) * (1.1 / 1023.0);////voltaje del sensor
    corriente=voltajeSensor*50.0; //corriente=VoltajeSensor*(30A/1V)
    Sumatoria=Sumatoria+sq(corriente);//Sumatoria de Cuadrados
    N=N+1;
    delay(1);
  }
  Sumatoria=Sumatoria*2;//Para compensar los cuadrados de los semiciclos negativos.
  corriente=sqrt((Sumatoria)/N); //ecuación del RMS
  return(corriente);
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
