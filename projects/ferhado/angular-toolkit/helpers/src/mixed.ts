export function generatePaginationOptions(
  maxLength: number,
  increments: number[] = [25, 50, 100, 200, 300, 400, 500]
) {
  try {
    const pageSizeOptions = new Set([
      ...increments.filter((increment) => increment < maxLength),
      maxLength,
    ]);
    return Array.from(pageSizeOptions);
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
}

export function getDeviceToken() {
  // Try to get the token from local storage
  let token = localStorage.getItem('fat.x-device');

  // If no token is found or the token length is not 32, generate a new one
  if (!token || token.length !== 32) {
    let randomBytes = crypto.getRandomValues(new Uint8Array(16));
    token = Array.from(randomBytes, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('');

    // Store the new token in local storage
    localStorage.setItem('fat.x-device', token);
  }

  return token;
}

export function uniqid(length: number = 22) {
  let id =
    Date.now().toString(16) +
    Math.floor(Math.random() * 0x100000000).toString(16);
  while (id.length < length) {
    id += Math.floor(Math.random() * 0x100000000).toString(16);
  }
  return id.substring(0, length);
}

export function round(number: any, precision = 0) {
  number = Number(number); // Convert input to a number

  if (isNaN(number) || !isFinite(number)) {
    return 0;
  }

  let adjustment = 0.5;
  if (number < 0) adjustment = -0.5;
  let scalingFactor = Math.pow(10, precision);
  return (
    Math.round((number + adjustment / (scalingFactor * 10)) * scalingFactor) /
    scalingFactor
  );
}
