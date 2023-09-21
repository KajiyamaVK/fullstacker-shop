
# Fullstacker Shop
**Status:** Under Construction 
**Fullstacker shop** was developed mainly for payment platform integrations. The main pourse here is not to show a complete e-commerce website but instead to use the online payment services. 
	  
**ToDo's**

 - [ ] Caroulsel doesn't seem like a ... well... Caroulsel. Need to show half of the image of the last card
 - [ ]  Add a warning at the payment button saying that it is only for testing.
 - [ ] Add more e-commerce features

## How It Works

### About the service used
The payment online service is something to be integrated in out platform - not entirely developed. It means that it is a paid service. (Well, I am pretty sure that if you are owner of one of this kind of financial companies, probably you have the option of not paying)

In **Fullstacker Shop** we are going to use [Stripe](stripe.com). Using their services we have a development environment where we can make payments only for testing. 

For this testes to work, we have to use some particular cards numbers (The CVC can be any and the date only have to be any date in the future.)

| Card Company | Card Number |
|--|--|
| Visa Credit | 4242424242424242  |
| Mastercard Credit| 5555555555554444 |


>**Important:** Like any other services, Stripe requires a token for testing. You can generate one goingo to their [website] and use it in the .env configuration file. (stripe.com)

>**Important- 2:** Here we make use of the api feature from NextJS - so no backend was needed.

### Techs Used
<div style='display:flex'>
<img src='https://fullstacker.com.br/imgs/Stacks/nextjs.jpg' width=60/>
<img src='https://fullstacker.com.br/imgs/Stacks/typescript.jpg' width=60/>
<img src='https://fullstacker.com.br/imgs/Stacks/tailwind.jpg' width=60/>
</div>