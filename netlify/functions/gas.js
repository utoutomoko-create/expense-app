const GAS_URL = "https://script.google.com/macros/s/AKfycby6IH87IVpoGaDsmeYZBkhfovm4YhAKHpqYoBHsBRqyx5PgjMP_nX12ZIuzfH9D1AhHUQ/exec";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
      redirect: "follow",
    });

    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
