
.PHONY: help test lint style text

help:
	@echo "Please use one of:\nmake test\nmake lint\nmake style\nmake text"

######################################################################

test:
	./node_modules/.bin/mocha tests

######################################################################

CHECK_FILES = models tests sync middlewares routes

lint:
	./node_modules/.bin/jshint --config jshintrc $(CHECK_FILES)

style:
	./node_modules/.bin/jscs --verbose --config jscsrc $(CHECK_FILES)

######################################################################

comma := ,
CONFIG_COURSE_DIR := $(shell grep -s courseDir config.json)
CONFIG_COURSE_DIR := $(strip $(CONFIG_COURSE_DIR))
CONFIG_COURSE_DIR := $(patsubst "courseDir":%,%,$(CONFIG_COURSE_DIR))
CONFIG_COURSE_DIR := $(strip $(CONFIG_COURSE_DIR))
CONFIG_COURSE_DIR := $(patsubst "%"$(comma),%,$(CONFIG_COURSE_DIR))
COURSE_DIR := $(if $(CONFIG_COURSE_DIR),$(CONFIG_COURSE_DIR),../exampleCourse)

QUESTIONS_DIR := $(COURSE_DIR)/questions
CLIENTCODE_DIR := $(COURSE_DIR)/clientCode

text:
	../tool/generate_text.py ../frontend/text $(QUESTIONS_DIR)
	../tool/generate_text.py ../frontend/text $(CLIENTCODE_DIR)
