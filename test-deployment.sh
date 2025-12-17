#!/bin/bash

# 🔍 Test Deployment Script
# This script tests all the requirements for CI/CD deployment
# Run this before pushing to verify everything is configured correctly

echo "════════════════════════════════════════════════════════"
echo "🔍 DEPLOYMENT REQUIREMENTS TEST"
echo "════════════════════════════════════════════════════════"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
EC2_HOST="15.134.39.65"
EC2_USERNAME="ubuntu"
EC2_TARGET_DIR="/var/www/supermarket"
SSH_KEY_PATH="$HOME/.ssh/github-deploy"

PASS_COUNT=0
FAIL_COUNT=0

# Test function
test_step() {
    local test_name="$1"
    local test_command="$2"
    
    echo -n "Testing: $test_name... "
    
    if eval "$test_command" &> /dev/null; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((PASS_COUNT++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((FAIL_COUNT++))
        return 1
    fi
}

# Test 1: Check if SSH key exists
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  SSH Key Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$SSH_KEY_PATH" ]; then
    echo -e "${GREEN}✅ SSH key found at: $SSH_KEY_PATH${NC}"
    
    # Check key permissions
    PERMS=$(stat -f "%OLp" "$SSH_KEY_PATH" 2>/dev/null || stat -c "%a" "$SSH_KEY_PATH" 2>/dev/null)
    if [ "$PERMS" = "600" ]; then
        echo -e "${GREEN}✅ SSH key has correct permissions (600)${NC}"
        ((PASS_COUNT++))
    else
        echo -e "${YELLOW}⚠️  SSH key permissions are $PERMS (should be 600)${NC}"
        echo "   Fix with: chmod 600 $SSH_KEY_PATH"
        ((FAIL_COUNT++))
    fi
    
    # Check if key is in correct format
    if grep -q "BEGIN.*PRIVATE KEY" "$SSH_KEY_PATH"; then
        echo -e "${GREEN}✅ SSH key format looks correct${NC}"
        ((PASS_COUNT++))
    else
        echo -e "${RED}❌ SSH key format is incorrect${NC}"
        echo "   Key should start with '-----BEGIN OPENSSH PRIVATE KEY-----'"
        ((FAIL_COUNT++))
    fi
else
    echo -e "${RED}❌ SSH key NOT found at: $SSH_KEY_PATH${NC}"
    echo ""
    echo "To generate SSH key on EC2:"
    echo "  ssh ubuntu@$EC2_HOST"
    echo "  ssh-keygen -t ed25519 -C 'github-deploy' -f ~/.ssh/github-deploy -N ''"
    echo "  cat ~/.ssh/github-deploy.pub >> ~/.ssh/authorized_keys"
    echo "  cat ~/.ssh/github-deploy  # Copy this to GitHub secret"
    ((FAIL_COUNT++))
fi

echo ""

# Test 2: SSH Connection
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  SSH Connection Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$SSH_KEY_PATH" ]; then
    echo "Connecting to EC2..."
    if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o ConnectTimeout=5 "$EC2_USERNAME@$EC2_HOST" "echo 'Connected'" &> /dev/null; then
        echo -e "${GREEN}✅ SSH connection successful${NC}"
        
        # Get hostname
        HOSTNAME=$(ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USERNAME@$EC2_HOST" "hostname" 2>/dev/null)
        echo "   Server hostname: $HOSTNAME"
        ((PASS_COUNT++))
    else
        echo -e "${RED}❌ SSH connection failed${NC}"
        echo "   Host: $EC2_USERNAME@$EC2_HOST"
        echo "   Key: $SSH_KEY_PATH"
        echo ""
        echo "Troubleshoot:"
        echo "  1. Make sure EC2 security group allows SSH from your IP"
        echo "  2. Verify the public key is in ~/.ssh/authorized_keys on EC2"
        echo "  3. Test manually: ssh -i $SSH_KEY_PATH $EC2_USERNAME@$EC2_HOST"
        ((FAIL_COUNT++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping (SSH key not found)${NC}"
fi

echo ""

# Test 3: Target Directory
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Target Directory Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$SSH_KEY_PATH" ]; then
    # Check if directory exists
    if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USERNAME@$EC2_HOST" "test -d $EC2_TARGET_DIR" 2>/dev/null; then
        echo -e "${GREEN}✅ Target directory exists: $EC2_TARGET_DIR${NC}"
        
        # Check if writable with sudo
        if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USERNAME@$EC2_HOST" "sudo touch $EC2_TARGET_DIR/.test && sudo rm $EC2_TARGET_DIR/.test" 2>/dev/null; then
            echo -e "${GREEN}✅ Can write to target directory (with sudo)${NC}"
            ((PASS_COUNT++))
        else
            echo -e "${RED}❌ Cannot write to target directory${NC}"
            ((FAIL_COUNT++))
        fi
        
        # Check file count
        FILE_COUNT=$(ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USERNAME@$EC2_HOST" "find $EC2_TARGET_DIR -type f 2>/dev/null | wc -l" 2>/dev/null | tr -d ' ')
        echo "   Current files in directory: $FILE_COUNT"
        ((PASS_COUNT++))
    else
        echo -e "${YELLOW}⚠️  Target directory doesn't exist: $EC2_TARGET_DIR${NC}"
        echo "   Will be created during deployment"
        ((PASS_COUNT++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping (SSH key not found)${NC}"
fi

echo ""

# Test 4: Sudo Access
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Sudo Access Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$SSH_KEY_PATH" ]; then
    if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USERNAME@$EC2_HOST" "sudo -n ls /root" &> /dev/null; then
        echo -e "${GREEN}✅ Sudo works without password${NC}"
        ((PASS_COUNT++))
    else
        echo -e "${RED}❌ Sudo requires password${NC}"
        echo ""
        echo "Fix on EC2:"
        echo "  sudo visudo"
        echo "  Add this line at the END: ubuntu ALL=(ALL) NOPASSWD: ALL"
        echo "  Save: Ctrl+X, Y, Enter"
        ((FAIL_COUNT++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping (SSH key not found)${NC}"
fi

echo ""

# Test 5: Nginx Status
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  Nginx Status Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$SSH_KEY_PATH" ]; then
    if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USERNAME@$EC2_HOST" "sudo systemctl is-active nginx" &> /dev/null; then
        echo -e "${GREEN}✅ Nginx is running${NC}"
        ((PASS_COUNT++))
    else
        echo -e "${RED}❌ Nginx is not running${NC}"
        echo "   Start with: sudo systemctl start nginx"
        ((FAIL_COUNT++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping (SSH key not found)${NC}"
fi

echo ""

# Test 6: Website Accessibility
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣  Website Accessibility Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://$EC2_HOST" 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Website is accessible (HTTP $HTTP_CODE)${NC}"
    echo "   URL: http://$EC2_HOST"
    ((PASS_COUNT++))
elif [ "$HTTP_CODE" = "000" ]; then
    echo -e "${RED}❌ Cannot reach website (connection failed)${NC}"
    echo "   Check EC2 security group - port 80 must be open"
    ((FAIL_COUNT++))
else
    echo -e "${YELLOW}⚠️  Website returned HTTP $HTTP_CODE${NC}"
    ((FAIL_COUNT++))
fi

echo ""

# Test 7: GitHub Repository
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7️⃣  GitHub Repository Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if git remote -v | grep -q "github.com"; then
    echo -e "${GREEN}✅ Git remote is configured${NC}"
    REPO_URL=$(git remote get-url origin 2>/dev/null)
    echo "   Repository: $REPO_URL"
    ((PASS_COUNT++))
else
    echo -e "${RED}❌ Git remote not configured${NC}"
    ((FAIL_COUNT++))
fi

if git branch | grep -q "main"; then
    echo -e "${GREEN}✅ On main branch${NC}"
    ((PASS_COUNT++))
else
    CURRENT_BRANCH=$(git branch --show-current)
    echo -e "${YELLOW}⚠️  On branch: $CURRENT_BRANCH (workflow triggers on 'main')${NC}"
    ((FAIL_COUNT++))
fi

echo ""

# Test 8: Local Build
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8️⃣  Local Build Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json found${NC}"
    ((PASS_COUNT++))
    
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ node_modules exists${NC}"
        ((PASS_COUNT++))
    else
        echo -e "${YELLOW}⚠️  node_modules not found (run: npm install)${NC}"
        ((FAIL_COUNT++))
    fi
    
    echo "Testing build..."
    if npm run build &> /dev/null; then
        echo -e "${GREEN}✅ Build succeeds${NC}"
        
        if [ -d "dist" ]; then
            FILE_COUNT=$(find dist -type f | wc -l | tr -d ' ')
            echo "   Built files: $FILE_COUNT"
            ((PASS_COUNT++))
        else
            echo -e "${RED}❌ dist directory not created${NC}"
            ((FAIL_COUNT++))
        fi
    else
        echo -e "${RED}❌ Build failed${NC}"
        ((FAIL_COUNT++))
    fi
else
    echo -e "${RED}❌ package.json not found${NC}"
    ((FAIL_COUNT++))
fi

echo ""

# Summary
echo "════════════════════════════════════════════════════════"
echo "📊 TEST SUMMARY"
echo "════════════════════════════════════════════════════════"
echo -e "${GREEN}Passed: $PASS_COUNT${NC}"
echo -e "${RED}Failed: $FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED!${NC}"
    echo ""
    echo "Your deployment is ready! You can now:"
    echo "  1. Commit and push your changes"
    echo "  2. GitHub Actions will automatically deploy"
    echo "  3. Check: https://github.com/SahanHasintha/supermarket-web/actions"
    echo ""
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    echo ""
    echo "Please fix the failed tests before deploying."
    echo "Check the detailed output above for troubleshooting steps."
    echo ""
    echo "📚 For detailed help, see: CI-CD-DEBUG.md"
    exit 1
fi

