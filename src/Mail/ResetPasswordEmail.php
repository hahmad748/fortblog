<?php

namespace Fortblog\Mail;

use Illuminate\Mail\Mailable;

class ResetPasswordEmail extends Mailable
{
    /**
     * The token for the reset.
     *
     * @var string
     */
    public $token;

    /**
     * New instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reset your password')
            ->view('fortblog::emails.password', [
                'link' => route('fortblog.password.reset', ['token' => $this->token]),
            ]);
    }
}
