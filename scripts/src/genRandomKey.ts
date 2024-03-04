async function generateSecretHex() {
  // Generate a random key
  const key = await crypto.subtle.generateKey(
    { name: "HMAC",
      hash: 'SHA-256',
      length: 256 },
    true,
    ["sign"]
  );

  // Export the key to an ArrayBuffer
  const exportedKey = await crypto.subtle.exportKey("raw", key);
  // Convert the ArrayBuffer to a Hex string
  return Array.from(new Uint8Array(exportedKey))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Call the function and log the result
generateSecretHex().then((hexKey) => {
  console.log("Generated Key:", hexKey);
});