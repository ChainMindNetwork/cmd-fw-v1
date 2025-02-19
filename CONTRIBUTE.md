# Contributing to ChainMind (CMD) Framework

We welcome contributions to the ChainMind (CMD) Framework! This guide will help you understand how to participate in and contribute to our project.

## 🌟 Ways to Contribute

### 1. Reporting Issues

If you find a bug or have a suggestion, please open an issue on our GitHub repository. When creating an issue, please:

- Use a clear and descriptive title
- Provide detailed steps to reproduce (for bugs)
- Include relevant code snippets or error messages
- Specify which agent you were using (if applicable)
- Add screenshots if helpful

### 2. Development Setup

1. Fork the repository:

   ```bash
   # Clone your fork
   git clone https://github.com/ChainMindNetwork/cmd-fw-v1
   cd chainmind-fw-v1

   # Install dependencies
   npm install

   # Create .env file
   cp .env.example .env
   ```

2. Configure your environment:
   - Add your OpenAI API key
   - Set up the API URL
   - Install required dependencies

### 3. Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Follow our coding standards:

   - Use TypeScript
   - Add appropriate comments
   - Follow existing formatting
   - Include type definitions

3. Test your changes:
   ```bash
   npm run build
   npm run test # if applicable
   ```

### 4. Submitting Changes

1. Push your changes:

   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a Pull Request:
   - Use a clear title and description
   - Reference any related issues
   - Explain your changes
   - List any breaking changes

## 🎯 Focus Areas

We especially welcome contributions in these areas:

1. **Agent Enhancements**

   - Improving existing agents (Lumina, Stella, Matrix, Nebula)
   - Adding new agent personalities
   - Enhancing AI responses

2. **Monitoring Features**

   - New blockchain event monitors
   - Enhanced data analysis
   - Improved real-time tracking

3. **Performance Optimization**

   - Rate limiting improvements
   - Connection handling
   - Error recovery

4. **Documentation**
   - Usage examples
   - API documentation
   - Configuration guides

## 📝 Code Style Guidelines

- Use meaningful variable and function names
- Add TypeScript type definitions
- Include JSDoc comments for functions
- Follow existing project structure
- Use consistent formatting

## 🔍 Review Process

1. All PRs require review from at least one maintainer
2. Changes must pass all tests
3. Documentation must be updated if needed
4. Breaking changes must be clearly marked

## 🤝 Community Guidelines

- Be respectful and constructive
- Help others when possible
- Follow our code of conduct
- Credit others' contributions
- Ask questions when unclear

## 🚀 Getting Help

- Check existing issues and documentation
- Join our community discussions
- Reach out to maintainers
- Ask questions in PR comments

## 📜 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

Thank you for contributing to ChainMind (CMD)! 🎉
