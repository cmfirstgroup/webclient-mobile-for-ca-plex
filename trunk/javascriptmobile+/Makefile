
#
# ADC Make standard header
#
-include make.adccfg
-include make.adcvars
ifeq ($(ADCMAKE),)
default %: $(WCROOT)/ADCMake
	$(MAKE) -I$(WCROOT)/ADCMake $@
make.%: ;	
$(WCROOT)/ADCMake:
	svn co $(SVNREV) $(SVNURL)/ADCMake $(WCROOT)/ADCMake
endif

# Project information
DELIV=WebPlex
PROJECT=javascript
PROJEXT=zip

PROJECT_OUT=WebClientDojo

# Constituent projects
REQUIRED=

OBJDIR=bin

# Extra things to put in the package
ZIP_EXTRA=js

# Version file(s)
VERS=js/wcli/version.js

# Always include this last line
-include make.adcrules
