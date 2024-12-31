import { ApiClient, requests } from "recombee-api-client";

const client = new ApiClient(
	"[RECOMBEE_DATABASE_ID]",
	"[RECOMBEE_DATABASE_PRIVATE_TOKEN]",
	{ region: "us-west" }
);

const request = new requests.ListUsers({ count: 10 });

client
	.send(request)
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error(error);
	});