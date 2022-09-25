#include <HX711_ADC.h>
#include <EEPROM.h>

const int HX711_dout = 4; //mcu > HX711 dout pin
const int HX711_sck = 5; //mcu > HX711 sck pin


HX711_ADC LoadCell(HX711_dout, HX711_sck); //Constructor

const int calVal_eepromAdress = 0;
unsigned long t = 0;
void setup() {
   Serial.begin(115200);
  delay(10);
  // put your setup code here, to run once:
 LoadCell.begin();
  float calibrationValue = 696.0;
  
  EEPROM.begin(512);
  EEPROM.get(calVal_eepromAdress, calibrationValue);
  
  unsigned long stabilizingtime = 2000;
  boolean _tare = true;
    LoadCell.start(stabilizingtime, _tare);
    LoadCell.setCalFactor(calibrationValue); // set calibration value (float)
    Serial.println("Startup is complete");
}

void loop() {
  static boolean newDataReady = 0;
  const int serialPrintInterval = 0; //increase value to slow down serial print activity

  // check for new data/start next conversion:
  if (LoadCell.update()) newDataReady = true;

if (newDataReady) {
    if (millis() > t + serialPrintInterval) {
      float i = LoadCell.getData();
      Serial.print("Load_cell output val: ");
      Serial.println(i);
      newDataReady = 0;
      t = millis();
    }
  }
  // receive command from serial terminal, send 't' to initiate tare operation:
  if (Serial.available() > 0) {
    char inByte = Serial.read();
    if (inByte == 't') LoadCell.tareNoDelay();
  }
  // check if last tare operation is complete:
  if (LoadCell.getTareStatus() == true) {
    Serial.println("Tare complete");
  }
}
