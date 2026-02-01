<?php
// Kontrola, zda byl formulář odeslán
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Načtení a ořezy formulářových hodnot
    $name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
    $email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $customSubject = isset($_POST['subject']) ? trim($_POST['subject']) : '';

    // Cílová e‑mailová adresa pro doručení
    $recipient = 'hezina@gmail.com';
    // Adresa z vaší domény – musí existovat a mít správně nastavené SPF/DKIM
    $senderDomain = 'info@coumis.cz';

    // Kontrola povinných polí
    if ($name === '' || $email === '' || $message === '') {
        header('Location: index.html?status=error&msg=Všechna povinná pole musí být vyplněna.');
        exit;
    }
    // Validace e‑mailu
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: index.html?status=error&msg=Neplatná emailová adresa.');
        exit;
    }

    // Sestavení předmětu – pokud je vlastní, použije se; jinak výchozí text
    $subject = $customSubject !== '' ? $customSubject : 'Zpráva z kontaktního formuláře';

    // Hlavičky e‑mailu
    $headers   = [];
    $headers[] = 'From: ' . $senderDomain;
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';

    // Vytvoření HTML obsahu zprávy s bezpečným escapováním
    $emailContent  = '<html><body>';
    $emailContent .= '<h2>Nová zpráva z kontaktního formuláře</h2>';
    $emailContent .= '<p><strong>Jméno:</strong> ' . htmlspecialchars($name) . '</p>';
    if ($customSubject !== '') {
        $emailContent .= '<p><strong>Předmět:</strong> ' . htmlspecialchars($customSubject) . '</p>';
    }
    $emailContent .= '<p><strong>E‑mail:</strong> ' . htmlspecialchars($email) . '</p>';
    $emailContent .= '<p><strong>Zpráva:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>';
    $emailContent .= '<hr>';
    $emailContent .= '<p><em>Tato zpráva byla odeslána z kontaktního formuláře na vašich osobních stránkách.</em></p>';
    $emailContent .= '</body></html>';

    // Zalomení řádků na 70 znaků kvůli specifikaci RFC 2822
    $wrappedBody = wordwrap($emailContent, 70, "\r\n", true);

    // Nastavení sendmail_from pro správný návrat (bounce) – vyžaduje doménovou adresu
    ini_set('sendmail_from', $senderDomain);
    // Pátý parametr -f nastaví return‑path; nutné pro WEDOS dle doporučení【368592780137112†L71-L79】
    $additionalParams = '-f ' . $senderDomain;

    // Odeslání e‑mailu pomocí mb_send_mail (zabalí mail() a zajistí správné kódování)
    $success = mb_send_mail($recipient, $subject, $wrappedBody, implode("\r\n", $headers), $additionalParams);

    // Přesměrování na děkovnou stránku nebo zpět na formulář
    if ($success) {
        header('Location: dekujeme.html');
    } else {
        header('Location: index.html?status=error&msg=Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu.');
    }
    exit;
}
?>