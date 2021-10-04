# SIMPLE MICROSERVICE WITH KAFKA

## ABOUT

small project to test kafka and how it works for that i created a simple email sending using kafka producer and consumer

## RUN PROJECT

```jsx
npm installl
```

```jsx
//to run kafka
docker-compose up -d
```

## .ENV

```jsx
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```

## START APIS

```jsx
npm run producer //start producer api
npm run consumer //start consumer service
```

## TESTING

```jsx
// http://localhost:3333/sendMail
//To send email

{
	"from":"from@gmail.com",
	"to":"to@gmail.com",
	"text":"microservice with kafka to send email",
	"subject":"send email with kafka"
}
```
