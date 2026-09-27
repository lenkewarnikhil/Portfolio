#!/bin/bash

# This script generates a .env file at deploy time so the frontend can fetch it.
# We only do this if running in Netlify CI, to avoid overwriting local .env files.
if [ "$NETLIFY" = "true" ]; then
  echo "EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}" > .env
  echo "EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}" >> .env
  echo "EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}" >> .env
  echo "Generated .env file for frontend consumption"
else
  echo "Not running in Netlify CI, skipping .env generation."
fi
