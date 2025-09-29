# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - img "company-logo" [ref=e6]
    - generic [ref=e7]:
      - generic [ref=e8]:
        - heading "Sign In" [level=2] [ref=e9]
        - paragraph [ref=e10]: Enter your credential to get started.
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: Email
          - textbox "e.g. olivia@email.com" [ref=e15]: invalid@admin.com
        - generic [ref=e16]:
          - generic [ref=e17]: Password
          - generic [ref=e18]:
            - textbox "Type Password" [ref=e20]: invali
            - button [ref=e21] [cursor=pointer]:
              - img [ref=e22] [cursor=pointer]
        - generic [ref=e25]:
          - button "Sign In" [ref=e26] [cursor=pointer]
          - link "Forgot Password?" [ref=e27] [cursor=pointer]:
            - /url: /forgot-password
        - generic [ref=e28]:
          - generic [ref=e29]:
            - separator [ref=e30]
            - generic [ref=e31]: or
            - separator [ref=e32]
          - button [ref=e34] [cursor=pointer]:
            - img [ref=e35] [cursor=pointer]
    - generic [ref=e41]:
      - generic [ref=e42]: Don't have an account?
      - link "Sign Up" [ref=e43] [cursor=pointer]:
        - /url: /signup
  - status [ref=e49]: No user found with this email!
```