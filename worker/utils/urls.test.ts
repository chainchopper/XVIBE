import { describe, it, expect } from 'vitest';
import { getPreviewDomain, getProtocolForHost } from './urls';

// Helper function to create mock Env objects for testing
function createMockEnv(overrides: Partial<Env> = {}): Env {
    return overrides as Env;
}

describe('URL utilities', () => {
    describe('getPreviewDomain', () => {
        it('should return CUSTOM_PREVIEW_DOMAIN when set', () => {
            const env = createMockEnv({
                CUSTOM_PREVIEW_DOMAIN: 'preview.example.com',
                CUSTOM_DOMAIN: 'example.com',
            });

            expect(getPreviewDomain(env)).toBe('preview.example.com');
        });

        it('should return CUSTOM_DOMAIN when CUSTOM_PREVIEW_DOMAIN is not set', () => {
            const env = createMockEnv({
                CUSTOM_DOMAIN: 'example.com',
            });

            expect(getPreviewDomain(env)).toBe('example.com');
        });

        it('should return "localhost" as default when CUSTOM_DOMAIN is not set', () => {
            const env = createMockEnv({
                CUSTOM_DOMAIN: '',
            });

            expect(getPreviewDomain(env)).toBe('localhost');
        });

        it('should return "localhost" when CUSTOM_DOMAIN is undefined', () => {
            const env = createMockEnv({});

            expect(getPreviewDomain(env)).toBe('localhost');
        });

        it('should return "localhost" when CUSTOM_DOMAIN is whitespace only', () => {
            const env = createMockEnv({
                CUSTOM_DOMAIN: '   ',
            });

            expect(getPreviewDomain(env)).toBe('localhost');
        });

        it('should ignore whitespace-only CUSTOM_PREVIEW_DOMAIN and use CUSTOM_DOMAIN', () => {
            const env = createMockEnv({
                CUSTOM_PREVIEW_DOMAIN: '   ',
                CUSTOM_DOMAIN: 'example.com',
            });

            expect(getPreviewDomain(env)).toBe('example.com');
        });

        it('should return "localhost" when both CUSTOM_PREVIEW_DOMAIN and CUSTOM_DOMAIN are empty', () => {
            const env = createMockEnv({
                CUSTOM_PREVIEW_DOMAIN: '',
                CUSTOM_DOMAIN: '',
            });

            expect(getPreviewDomain(env)).toBe('localhost');
        });
    });

    describe('getProtocolForHost', () => {
        it('should return "http" for localhost', () => {
            expect(getProtocolForHost('localhost')).toBe('http');
        });

        it('should return "http" for 127.0.0.1', () => {
            expect(getProtocolForHost('127.0.0.1')).toBe('http');
        });

        it('should return "http" for 0.0.0.0', () => {
            expect(getProtocolForHost('0.0.0.0')).toBe('http');
        });

        it('should return "http" for ::1 (IPv6 localhost)', () => {
            expect(getProtocolForHost('::1')).toBe('http');
        });

        it('should return "https" for production domains', () => {
            expect(getProtocolForHost('example.com')).toBe('https');
            expect(getProtocolForHost('build.viber.dev')).toBe('https');
        });
    });
});
