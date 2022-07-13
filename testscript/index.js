const axios = require("axios").default;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const cookie =
  "session=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsYldGcGJDSTZJbk52YldWdmJtVkFaMjFoYVd3dVkyOXRJaXdpYVdRaU9pSTJNbU5rTVRZM04yUmlORFV5WmpBd01XRXdOVFZsWldFaUxDSmhkbUYwWVhJaU9pSXZMM2QzZHk1bmNtRjJZWFJoY2k1amIyMHZZWFpoZEdGeUx6TmhZMlF6T1dRellXTTVOVE16TVdFMVlUZ3dObVppTXpGaU5qUmtObVV5UDNNOU1qQXdKbkk5Y0djbVpEMXRiU0lzSW1saGRDSTZNVFkxTnpZd09URTBPU3dpWlhod0lqb3hOalUzTnpneE9UUTVmUS5zSzhhQ0NxbHNpWjFGNFFqYU5PaVE5NlVNd0M4aXFKNWFlMWtNcDZSbElVIn0=";
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

async function makeUpdateRequest() {
  const res = await axios.post(
    "http://ticketing.com/api/tickets/new",
    {
      title: "Mohamed Hussein Ticket",
      price: 5,
    },
    {
      headers: {
        cookie,
      },
    }
  );
  await axios.put(
    `http://ticketing.com/api/tickets/ticket/${res.data.data.id}`,
    {
      title: "Mohamed Hussein Ticket",
      price: 10,
    },
    {
      headers: {
        cookie,
      },
    }
  );
  await axios.put(
    `http://ticketing.com/api/tickets/ticket/${res.data.data.id}`,
    {
      title: "Mohamed Hussein Ticket",
      price: 15,
    },
    {
      headers: {
        cookie,
      },
    }
  );
}

app.get(
  "/start",
  asyncHandler(async (req, res) => {
    await makeUpdateRequest();
    res.json({ message: "started" });
  })
);

app.get(
  "/price",
  asyncHandler(async (req, res, next) => {
    const response = await axios.get(
      `http://ticketing.com/api/orders/tickets`,
      {
        headers: {
          cookie,
        },
      }
    );
    res.json({
      price: response.data.data.tickets,
    });
  })
);

app.get(
  "/tickets/price",
  asyncHandler(async (req, res, next) => {
    const response = await axios.get(`http://ticketing.com/api/tickets/all`, {
      headers: {
        cookie,
      },
    });
    res.json({
      price: response.data.data.tickets,
    });
  })
);

app.get(
  "/clean",
  asyncHandler(async (req, res, next) => {
    await axios.get(`http://ticketing.com/api/tickets/tickets/delete`, {
      headers: {
        cookie,
      },
    });

    await axios.get(`http://ticketing.com/api/orders/tickets/delete`, {
      headers: {
        cookie,
      },
    });
    res.json({
      message: "cleaned",
    });
  })
);

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(5000, () => {
  console.log(`Server started`);
});
