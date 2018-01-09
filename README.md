homebridge-olisto
==============================

![homebridge-olisto: Downloads](https://img.shields.io/npm/dt/homebridge-olisto.svg?style=flat) ![homebridge-olisto: Version](https://img.shields.io/npm/v/homebridge-olisto.svg)

What is homebridge-olisto
------------------------------
With homebridge-olisto you can use all your Olisto services in homekit. In homekit you have a button, if you press that button it wil connect to the Olisto server and run your action!

How to install
------------------------------

First if you haven't installed homebridge yet install it by using the command:

`npm install -g homebridge`

Then install this plugin by using the command:

`npm install -g homebridge-olisto`

Now you're done with installing. Now we want to setup the Olisto app!

How to set up Olisto
------------------------------

First go to olisto.com/connect/ log in and choose a username. Once thats done create a new connector. You can call it whatever you want. Now you should get an e-mail on the e-mail adress you're registered at Olisto. Keep this e-mail in your mailbox.

### Push buttons
Open up your olisto app on your phone/tablet. Then add a new trigg. Choose the when condition and select Olisto Connect. Now select the connector you have just added, press 'connector turned on'. Then in the Then action you can choose what you want to happen when you press the button. Then click save trigg and name it whatever you want!

### Switches and Outlets
Open up your olisto app on your phone/tablet. Then add two new triggs. In the when condition and select Olisto Connect. Now select the connector you have just added, press 'connector has value'. In the first trigg you select 'equal to' and type in '1', in the second trigg you do the same but now type '0' instead of '1'. Then in the Then action of your first trigg you can choose what you want to turn on when you activate the button. And in the second one you turn it off. Then click save trigg and name it whatever you want!

How to set up Homebridge
------------------------------

This is the sample config.json for homebridge.
```
"platforms": [
    {
        "platform": "Olisto",
        "triggs": [
            {
                "name": "Sample push",
                "type": "push",
                "connecturl": "YOUR UNIQUE CONNECT URL"
            },
            {
                "name": "Sample switch",
                "type": "switch",
                "connecturl": "YOUR UNIQUE CONNECT URL"
            },
            {
                "name": "Sample outlet",
                "type": "outlet",
                "connecturl": "YOUR UNIQUE CONNECT URL"
            }
        ]
    }
]
```

* platform: Must always be Olisto.
* triggs: A dictionary of all the triggs you want in homekit
* triggs/name: The name that you want the button to have in homekit.
* triggs/type: The your button needs to be either push, switch or outlet.
* triggs/connecturl: This is the Connect URL you received from Olisto.
