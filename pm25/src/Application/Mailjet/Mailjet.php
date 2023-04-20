<?php

namespace App\Application\Mailjet;

use Mailjet\Resources;

class Mailjet implements MailjetInterface
{

    private string $API_KEY = 'fe9a7961b4775d27f5b1d0da67facf96';
    private string $SECRET_KEY = '0c6c8c02ee987e4f43735cbd5e965d4a';

    public function registerSend()
    {
        $mj = new \Mailjet\Client($this->API_KEY, $this->SECRET_KEY, true, ['version' => 'v3.1']);
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "nuttapong6280@gmail.com",
                        'Name' => "AuJung"
                    ],
                    'To' => [
                        [
                            'Email' => "passenger1@example.com",
                            'Name' => "passenger 1"
                        ]
                    ],
                    'TemplateID' => 4721707,
                    'TemplateLanguage' => true,
                    'Subject' => "WELCOME TO OUR WEBSITE",
//                    'Variables' => json_decode('{}', true)
                ]
            ]
        ];
        return $mj->post(Resources::$Email, ['body' => $body])->getData();
    }
}
