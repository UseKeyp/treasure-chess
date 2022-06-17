# Security Practices

### Security Policy:

1. Store as little user data as possible.
2. any PII or private data related to users must be fully encrypted as we store it
3. No direct human interaction with stored user data is allowed
4. No direct human involvement in collection of personal user data is allowed.
5. User data should stay on the users local instance of the app, and interactions between front end and backend / passing or processing user data must be end to end and secure.

### Discussion Questions

During the plaid integration, they ask questions like these. I think these are good starting points for coming up with a more formal security strategy. At the very least, we should make a security todo-list for ourselves.

Governance

2: Does your organization have a documented information security policy that has been operationalized to identify, mitigate, and monitor information security risks relevant to your business?

Asset Management

3: Does your organization have a mechanism for discovering and maintaining visibility into all network endpoints connected to your corporate and production networks? [NOTE: A network endpoint in this context is an asset connected to your corporate OR production network--like a laptop or a server instance]

4: Do you actively perform vulnerability scans against your employee and contractor machines (e.g. laptops) and production assets (e.g. server instances) to detect and patch vulnerabilities?

5: Do you use endpoint security tools and agents to protect employee and contractor machines (e.g. laptops) and production assets (e.g. mutable server instances) against malicious code (e.g. viruses and malware)?

6: Does your organization allow employees and contractors to use their personal devices (BYOD) for carrying out their job responsibilities?

Access Controls

7: Does your organization have a defined process for controlling access to production assets and data?

8: Has your organization deployed strong factors of authentication (e.g. 2-factor authentication) for all critical assets?
