void setup() {
  Serial.begin(115200);
  analogReference(EXTERNAL);
}

void loop() {  
  int sensorValue = analogRead(A0); //Lectura analógica
  float voltajeSensor = analogRead(A0) * (1.1 / 1023.0); //voltaje del sensor
  float corriente=voltajeSensor*50.0; //corriente=VoltajeSensor*(30A/1V)
  Serial.println(corriente,3);//enviamos por el puerto serie
}
