import posthog from "posthog-js";
import { browser } from "$app/environment";
import {
  PUBLIC_POSTHOG_API_KEY,
  PUBLIC_POSTHOG_HOST,
} from "$env/static/public";

let isInitialized = false;

export const initPostHog = () => {
  if (!browser) return;
  
  if (!PUBLIC_POSTHOG_API_KEY) {
    console.warn('⚠️  PostHog analytics disabled (PUBLIC_POSTHOG_API_KEY not set)');
    return;
  }

  try {
    posthog.init(PUBLIC_POSTHOG_API_KEY, {
      api_host: PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
    });
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize PostHog:', error);
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!isInitialized) return;
  
  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (!isInitialized) return;
  
  try {
    posthog.identify(userId, properties);
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
};

export const resetUser = () => {
  if (!isInitialized) return;
  
  try {
    posthog.reset();
  } catch (error) {
    console.error('Failed to reset user:', error);
  }
};
