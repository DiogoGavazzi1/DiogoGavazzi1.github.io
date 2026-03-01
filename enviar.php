<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $mensagem = $_POST["mensagem"];

    $para = "cashfreemotiv@gmail.com"; // 🔴 MUDA PARA O TEU EMAIL
    $assunto = "Nova mensagem do site";

    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Telefone: $telefone\n\n";
    $corpo .= "Mensagem:\n$mensagem";

    $headers = "From: $email";

    if (mail($para, $assunto, $corpo, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar mensagem.";
    }
}
?>