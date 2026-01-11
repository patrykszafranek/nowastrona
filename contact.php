<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  header("Location: index.html");
  exit;
}

// HONEYPOT – jeśli wypełnione, bot
if (!empty($_POST['company'])) {
  exit;
}

// SANITACJA
$name    = strip_tags(trim($_POST["name"] ?? ""));
$phone   = strip_tags(trim($_POST["phone"] ?? ""));
$email   = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
$message = strip_tags(trim($_POST["message"] ?? ""));

// WALIDACJA
if (!$name || !$phone || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  exit("Niepoprawne dane formularza.");
}

// KONFIGURACJA
$to = "kontakt@szafranet.pl"; // <-- ZMIEŃ NA SWÓJ EMAIL
$subject = "Nowe zapytanie ze strony SzafraNET";

$body = "Nowe zapytanie:\n\n";
$body .= "Imię: $name\n";
$body .= "Telefon: $phone\n";
$body .= "Email: $email\n\n";
$body .= "Wiadomość:\n$message\n";

$headers = "From: SzafraNET <no-reply@szafranet.pl>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// WYSYŁKA
if (mail($to, $subject, $body, $headers)) {
  header("Location: index.html?sent=1");
} else {
  header("Location: index.html?error=1");
}
exit;
