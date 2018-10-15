sap.ui.define(function() {

	"use strict";

	return {
		name: "Library 'sap.ui.unified'",	/* Just for a nice title on the pages */
		defaults: {
			group: "Library",
			qunit: {
				version: 2					// Whether QUnit should be loaded and if so, what version
			},
			sinon: {
				version: 1					// Whether Sinon should be loaded and if so, what version
			},
			ui5: {
				language: "en-US",
				rtl: false,					// Whether to run the tests in RTL mode
				libs: ["sap.ui.unified"],		// Libraries to load upfront in addition to the library which is tested (sap.ui.unified), if null no libs are loaded
				"xx-waitForTheme": true		// Whether the start of the test should be delayed until the theme is applied
			},
			coverage: {
				only:	"[sap/ui/unified]",	// Which files to show in the coverage report, if null, no files are excluded from coverage
				branchCoverage: true		// Whether to enable standard branch coverage
			},
			loader: {
				paths: {
					"sap/ui/demo/mock": "test-resources/sap/ui/documentation/sdk/"
				}
			},
			page: "test-resources/sap/ui/unified/qunit/teststarter.qunit.html?test={name}",
			autostart: true					// Whether to call QUnit.start() when the test setup is done
		},
		tests: {
			"Shell": {
				group: "Shell"
			},
			"ShellLayout": {
				group: "Shell"
			},
			"ShellOverlay": {
				group: "Shell"
			},
			"SplitContainer": {
				group: "Shell"
			},
			"Calendar": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Calendar"]
				}
			},
			"CalendarRow": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarRow"]
				}
			},
			"CalendarDateInterval": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				sinon: {
					useFakeTimers: false
				},
				coverage: {
					only: ["sap/ui/layout/CalendarDateInterval"]
				}
			},
			"CalendarMonthInterval": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				sinon: {
					useFakeTimers: true
				},
				coverage: {
					only: ["sap/ui/layout/CalendarMonthInterval"]
				}
			},
			"CalendarOneMonthInterval": {
				group: "Calendar",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarOneMonthInterval"]
				}
			},
			"CalendarWeekInterval": {
				group: "Calendar",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarWeekInterval"]
				}
			},
			"CalendarTimeInterval": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarTimeInterval"]
				}
			},
			"CalendarDate": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarDate"]
				}
			},
			"Calendar_Islamic": {
				group: "Calendar",
				ui5: {
					calendarType: "islamic",
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Calendar_Islamic"]
				}
			},
			"Calendar_Japanese": {
				group: "Calendar",
				ui5: {
					calendarType: "Japanese",
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Calendar_Japanese"]
				}
			},
			"CalendarLegend": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarLegend"]
				}
			},
			"CalendarUtils": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/CalendarUtils"]
				}
			},
			"Month": {
				group: "Calendar",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Month"]
				}
			},
			"FileUploader": {
				group: "FileUploader",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/FileUploader"]
				}
			},
			"Header": {
				group: "Header",
				qunit: {
					version: 2
				},
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Header"]
				}
			},
			"ColorPicker": {
				group: "Calendar",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/ColorPicker"]
				}
			},
			"Currency": {
				group: "Currency",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Currency"]
				}
			},
			"Menu": {
				group: "Menu",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/Menu"]
				}
			},
			"MenuItem": {
				group: "Menu",
				ui5: {
					libs: ["sap.ui.unified", "sap.m"],
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/MenuItem"]
				}
			},
			"MonthPicker": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/MonthPicker"]
				}
			},
			"YearPicker": {
				group: "Calendar",
				ui5: {
					noConflict: true,
					theme: "sap_belize"
				},
				coverage: {
					only: ["sap/ui/layout/YearPicker"]
				}
			},
			"ExploredSamples": {
				runAfterLoader: "sap/ui/demo/mock/qunit/SampleTesterErrorHandler",
				qunit: {
					version: 2
				},
				sinon: {
					version: 1 // because MockServer is used by samples
				},
				ui5: {
					libs: ["sap.ui.unified", "sap.ui.documentation", "sap.ui.layout", "sap.m"],
					"xx-componentPreload": "off"
				},
				autostart: false
			},
			// Design Time & RTA Enabling
			"Designtime-Library": {
				group: "Designtime",
				module: "./designtime/Library.qunit",
				qunit: {
					version: 1
				},
				autostart: false
			}
		}
	};
});