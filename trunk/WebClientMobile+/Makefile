
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
PROJECT=WebClient
PROJEXT=zip

# Constituent projects
REQUIRED=WebPlex/WebClientCommon \
	WebPlex/WebClientPlex \
	WebPlex/WebClientServlet

SRCDIR=src
OBJDIR=bin

# Automatic generation of .classpath from .classpath.in
CP=.classpath

# Exclude jars from classpath
CP_EXCLUDE=pvAll.jar PlexBean*.jar

# Extra things to put in the package
ZIP_EXTRA=SysTemplates $(CP) .project .settings
ZIP_RESOURCES=src

# Add the JAR file to the zip
ZIP_JAR=yes

# Version file(s)
VERS=$(META)


COPY_RESOURCE=res/js
COPY_SRCDIR=res
COPY_OBJDIR=$(OBJDIR)/META-INF/resources
COPY_OBJS=$(OBJDIR)/META-INF/resources/js


all: default

res/js: 
	svn export $(SVNREV) $(SVNQUIET) $(SVNURL)/$(DELIV)/$(VERS_$(subst /,_,$(DELIV)))/javascript/js $@
	

# Always include this last line
-include make.adcrules
