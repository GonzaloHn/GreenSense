#include <MQ135.h>
#include <ESP8266WiFi.h>

void setup() {
Serial.begin(115200); //Init serial port
  delay(200);

}

void loop() {
   MQ135 gasSensor = MQ135(A0);
    float air_quality = gasSensor.getPPM();
    Serial.print("Air Quality: ");  
    Serial.print(air_quality);
    Serial.println("  PPM");   
     Serial.println();
     delay(500);
}  
