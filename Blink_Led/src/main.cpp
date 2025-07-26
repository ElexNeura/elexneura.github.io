// definisci la libreria da utilizzare
#include <Arduino.h>

#define LED_PIN 2  // cambia se usi un pin diverso

// necessario per inizializzare
void setup() {
  pinMode(LED_PIN, OUTPUT); // imposta il pin come output
}

// loop infinito
void loop() {
  digitalWrite(LED_PIN, HIGH); // accende il LED
  delay(500);                  // attende 500 ms
  digitalWrite(LED_PIN, LOW);  // spegne il LED
  delay(500);                  // attende 500 ms
}
